<?php

namespace App\Http\Controllers;

use App\Models\emplacementpv;
use App\Http\Requests\StoreemplacementpvRequest;
use App\Http\Requests\UpdateemplacementpvRequest;
use Illuminate\Validation\Rule;

class EmplacementpvController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $count = emplacementpv::where('pv_id', $id)->get();

        if ($count) {
            return response()->json($count);
        } else {
            return response()->json(null);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
    public function emplacementName($id)
    {
        // Find the category by its ID
        $emplacement = emplacementpv::findOrFail($id);

        // Retrieve the category name
        $emplacementName = $emplacement;

        // Return the category name as a JSON response
        return response()->json($emplacementName);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreemplacementpvRequest $request)
    {
        $validatedData = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',


            ],
            'capacite' => [
                'string',
                'string',
                'max:255',

            ],
            'pv_id' => [
                'string',
                'string',
                'max:255',

            ],

        ]);

        $emplacement = new emplacementpv();
        $emplacement->name = $validatedData['name'];
        $emplacement->capacite = $validatedData['capacite'];
        $emplacement->pv_id = $validatedData['pv_id'];

        $emplacement->save();

        return response()->json(['message' => 'emplacement created successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(emplacementpv $emplacementpv)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(emplacementpv $emplacementpv)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateemplacementpvRequest $request, $id)
    {
        $category = emplacementpv::findOrFail($id);

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
    public function destroy(emplacementpv $emplacementpv)
    {
        //
    }
}
