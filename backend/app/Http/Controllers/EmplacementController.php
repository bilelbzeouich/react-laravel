<?php

namespace App\Http\Controllers;

use App\Models\emplacement;
use App\Http\Requests\StoreemplacementRequest;
use App\Http\Requests\UpdateemplacementRequest;
use Illuminate\Validation\Rule;

class EmplacementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $emplacement = emplacement::all();
        return response()->json($emplacement);
    }

    /**
     * Show the form for creating a new resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreemplacementRequest $request)
    {
        $validatedData = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('emplacements')

            ],
            'capacite' => [
                'string',
                'string',
                'max:255',

            ]
        ]);

        $emplacement = new emplacement();
        $emplacement->name = $validatedData['name'];
        $emplacement->capacite = $validatedData['capacite'];

        $emplacement->save();

        return response()->json(['message' => 'emplacement created successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(emplacement $emplacement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(emplacement $emplacement)
    {
        //
    }
    public function emplacementName($id)
    {
        // Find the category by its ID
        $emplacement = emplacement::findOrFail($id);

        // Retrieve the category name
        $emplacementName = $emplacement;

        // Return the category name as a JSON response
        return response()->json($emplacementName);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateemplacementRequest $request, $id)
    {
        $category = Emplacement::findOrFail($id);

        if ($request->input('name') === null) {
            $category->name = $category->name;
        } else {
            $category->name = $request->input('name');
        }

        if ($request->input('capacite') === null) {
            $category->capacite = $category->capacite;
        } else {
            $category->capacite = $request->input('capacite');
        }

        $category->save();

        return response()->json(['message' => 'Category updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $emplacement = emplacement::findOrFail($id);
        $emplacement->delete();
        return response()->json(['message' => 'Category deleted successfully.']);
    }
}
