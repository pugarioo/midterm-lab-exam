<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // GET /api/tasks
    public function index()
    {
        return Task::all();
    }

    // POST /api/tasks
    public function store(Request $request)
    {
        $task = Task::create($request->all());
        return response()->json($task, 201);
    }

    // GET /api/tasks/{id}
    public function show($id)
    {
        return Task::findOrFail($id);
    }

    // PUT /api/tasks/{id}
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->update($request->all());
        return response()->json($task);
    }

    // DELETE /api/tasks/{id}
    public function destroy($id)
    {
        Task::destroy($id);
        return response()->json(null, 204);
    }
}