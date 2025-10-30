<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('messages/index', [
            'messages' => $messages
        ]);
    }

    public function show(Message $message)
    {
        // Mark message as read
        $message->update(['is_read' => true]);
        
        return Inertia::render('messages/show', [
            'message' => $message
        ]);
    }
}
