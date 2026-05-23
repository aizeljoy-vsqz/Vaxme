<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable(['name', 'email', 'password', 'user_type', 'is_first_login'])]
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
            'is_first_login' => 'boolean',
        ];
    }

    public function rhu(): HasOne
    {
        return $this->hasOne(Rhu::class);
    }

    public function bhc(): HasOne
    {
        return $this->hasOne(Bhc::class);
    }

    /**
     * Determine if the user can access the given BHC by id.
     * - RHU users: allowed when the BHC belongs to an RHU they own
     * - Barangay users: allowed when the BHC is their own
     */
    public function canAccessBhc(int $bhcId): bool
        {
            if ($this->rhu) {
                return Bhc::query()
                    ->where('rhu_id', $this->rhu->id)
                    ->whereKey($bhcId)
                    ->exists();
            }

            if ($this->bhc) {
                return $this->bhc->id === $bhcId;
            }

            return false;
        }

    /**
     * Determine if the user can access the given barangay by id (legacy - maps to BHC).
     * @deprecated Use canAccessBhc() instead
     */
    public function canAccessBarangay(int $barangayId): bool
    {
        return $this->canAccessBhc($barangayId);
    }
}
