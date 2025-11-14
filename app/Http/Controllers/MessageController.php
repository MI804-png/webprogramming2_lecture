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

    public function edit(Message $message)
    {
        return Inertia::render('messages/edit', [
            'message' => $message
        ]);
    }

    public function update(Request $request, Message $message)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'is_read' => 'boolean'
        ]);

        $message->update($validated);

        return redirect()->route('messages.show', $message)->with('success', 'Message updated successfully!');
    }

    public function destroy(Message $message)
    {
        $message->delete();

        return redirect()->route('messages.index')->with('success', 'Message deleted successfully!');
    }

    public function reply(Request $request, Message $message)
    {
        $validated = $request->validate([
            'reply_message' => 'required|string',
        ]);

        // Create a new message as a reply
        $reply = Message::create([
            'name' => 'Admin Reply',
            'email' => $message->email,
            'subject' => 'Re: ' . $message->subject,
            'message' => $validated['reply_message'],
            'is_read' => true,
        ]);

        // Mark original message as read
        $message->update(['is_read' => true]);

        return redirect()->route('messages.show', $message)->with('success', 'Reply sent successfully!');
    }
}
