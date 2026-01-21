<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller   // ← extends the base Controller
{
    public function index()
    {
        return Client::with(['projects.tasks'])->get();
    }

    public function show(Client $client)
{
    return $client->load(['projects.tasks']);
}
}