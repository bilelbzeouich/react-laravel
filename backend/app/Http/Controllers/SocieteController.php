<?php

namespace App\Http\Controllers;

use App\Models\societe;
use App\Http\Requests\StoresocieteRequest;
use App\Http\Requests\UpdatesocieteRequest;
use Illuminate\Support\Facades\Storage;

class SocieteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = societe::all();

        return response()->json($products);
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
    public function store(StoresocieteRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(societe $societe)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(societe $societe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatesocieteRequest $request, societe $id)
    {
        $societe = societe::findOrFail($id->id);



        if ($request->input('name') === null) {
            $societe->name = $societe->name;
        } else {
            $societe->name = $request->input('name');
        }
        if ($request->input('phone') === null) {
            $societe->phone = $societe->phone;
        } else {
            $societe->phone = $request->input('phone');
        }




        if ($request->hasFile('logo')) {
            $logoFile = $request->file('logo');

            // Store the new logo file and get its path
            $logoPath = $logoFile->store('product_images', 'public');

            // Delete the previous logo file, if it exists
            if ($societe->logo) {
                Storage::disk('public')->delete($societe->logo);
            }

            // Update the logo field with the new path
            $societe->logo = $logoPath;
        }



        $societe->save();

        return response()->json(['message' => 'societe updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(societe $societe)
    {
        //
    }
}
