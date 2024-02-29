<?php

namespace App\Http\Controllers;

use App\Models\rapprot;
use App\Http\Requests\StorerapprotRequest;
use App\Http\Requests\UpdaterapprotRequest;

class RapprotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rapprot = rapprot::all();
        return response()->json($rapprot);
    }


    public function indexname()
    {
        $rapprot = rapprot::all();
        return response()->json($rapprot);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorerapprotRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(rapprot $rapprot)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(rapprot $rapprot)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdaterapprotRequest $request, rapprot $rapprot)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(rapprot $rapprot)
    {
        //
    }
}
