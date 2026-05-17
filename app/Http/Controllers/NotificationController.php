<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Notification::query()->with(['rhu.bhcs:id,barangay_name,nurse_assigned,rhu_id']);

        if ($request->user()->rhu) {
            $query->where('rhu_id', $request->user()->rhu->id);
        } else {
            $query->where('user_id', $request->user()->id);
        }

        $notifications = $query->latest()->get()
            ->map(function (Notification $n) {
                return [
                    'id' => $n->id,
                    'type' => $n->type,
                    'bhc_id' => $n->rhu_id ?? null,
                    'is_read' => (bool) $n->is_read,
                    'created_at' => $n->created_at?->toDateTimeString(),
                    'bhc' => (function () use ($n) {
                        $rhu = $n->rhu;
                        if (! $rhu) {
                            return null;
                        }

                        $firstBhc = $rhu->bhcs->first();
                        $fromMeta = is_array($n->meta) && isset($n->meta['barangay_name']) ? $n->meta['barangay_name'] : null;

                        if ($firstBhc) {
                            return [
                                'barangay_name' => $firstBhc->barangay_name,
                                'nurse_assigned' => $firstBhc->nurse_assigned,
                            ];
                        }

                        if ($fromMeta) {
                            return [
                                'barangay_name' => $fromMeta,
                                'nurse_assigned' => null,
                            ];
                        }

                        return null;
                    })(),
                    'meta' => $n->meta ?? null,
                ];
            });

        return response()->json($notifications->values());
    }

    public function markAllAsRead(Request $request): JsonResponse
    {
        $query = Notification::query()->where('is_read', false);

        if ($request->user()->rhu) {
            $query->where('rhu_id', $request->user()->rhu->id);
        } else {
            $query->where('user_id', $request->user()->id);
        }

        $query->update(['is_read' => true]);

        return response()->json(['message' => 'Notifications marked as read.']);
    }

    public function markAsRead(Request $request, Notification $notification): JsonResponse
    {
        $allowed = false;
        if ($request->user()->rhu && $notification->rhu_id === $request->user()->rhu->id) {
            $allowed = true;
        }

        if ($notification->user_id === $request->user()->id) {
            $allowed = true;
        }

        abort_unless($allowed, 403);

        $notification->update(['is_read' => true]);

        return response()->json(['message' => 'Notification marked as read.']);
    }
}
