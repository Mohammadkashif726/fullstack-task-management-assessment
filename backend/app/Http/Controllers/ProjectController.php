<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // List all projects with their client and tasks (including task user)
    public function index()
    {
        return Project::with(['client', 'tasks.user'])->get();
    }

    // Show a single project with client and tasks
    public function show(Project $project)
    {
        return $project->load(['client', 'tasks.user']);
    }

    // Create a new project
    public function create(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'client_id' => 'required|exists:clients,id',
        ]);

        // Create project
        $project = Project::create($validated);

        // Load client relation
        $project->load(['client']);

        return response()->json([
            'message' => 'Project has been created successfully',
            'project' => $project
        ]);
    }
}
