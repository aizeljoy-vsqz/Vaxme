<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Authorization for private notifications channel
Broadcast::private('notifications.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
