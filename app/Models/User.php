<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\Barangay;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function rhu(): HasOne
    {
        return $this->hasOne(Rhu::class);
    }

    public function bhc(): HasOne{
        return $this->hasOne(Bhc::class);
    }

    /**
     * Determine if the user can access the given barangay by id.
     * - RHU users: allowed when the barangay belongs to an RHU they own (via BHC->rhu)
     * - Barangay users: allowed when their BHC owns the barangay
     */
    public function canAccessBarangay(int $barangayId): bool
    {
        // RHU-level access
        if ($this->rhu) {
            return Barangay::query()
                ->whereHas('bhc.rhu', function ($q) {
                    $q->whereKey($this->rhu->id);
                })
                ->whereKey($barangayId)
                ->exists();
        }

        // Barangay-level access via user's BHC
        if ($this->bhc) {
            return $this->bhc->barangays()->whereKey($barangayId)->exists();
        }

        return false;
    }
}
