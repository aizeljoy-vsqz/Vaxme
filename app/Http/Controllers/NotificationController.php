<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $notifications = Notification::query()
            ->with(['rhu:id,barangay_name'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get()
            ->map(function (Notification $n) {
                // Normalize payload to what the frontend expects
                return [
                    'id' => $n->id,
                    'type' => $n->type,
                    // frontend expects `bhc_id` — map from `rhu_id` if present
                    'bhc_id' => $n->rhu_id ?? null,
                    'is_read' => (bool) $n->is_read,
                    'created_at' => $n->created_at?->toDateTimeString(),
                    'bhc' => $n->rhu ? ['barangay_name' => $n->rhu->barangay_name] : null,
                    'meta' => $n->meta ?? null,
                ];
            });

        return response()->json($notifications->values());
    }

    public function markAllAsRead(Request $request): JsonResponse
    {
        Notification::query()
            ->where('user_id', $request->user()->id)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['message' => 'Notifications marked as read.']);
    }

    public function markAsRead(Request $request, Notification $notification): JsonResponse
    {
        abort_unless($notification->user_id === $request->user()->id, 403);

        $notification->update(['is_read' => true]);

        return response()->json(['message' => 'Notification marked as read.']);
    }
}
