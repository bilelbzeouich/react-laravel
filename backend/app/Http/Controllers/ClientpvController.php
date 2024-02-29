<?php

namespace App\Http\Controllers;

use App\Models\clientpv;
use App\Http\Requests\StoreclientpvRequest;
use App\Http\Requests\UpdateclientpvRequest;

class ClientpvController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $count = clientpv::where('pv_id', $id)->get();

        if ($count) {
            return response()->json($count);
        } else {
            return response()->json(null);
        }
    }
    public function clienttName($id)
    {
        // Find the category by its ID
        $client = clientpv::findOrFail($id);

        // Retrieve the category name
        $clienttName = $client;

        // Return the category name as a JSON response
        return response()->json($clienttName);
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
    public function store(StoreclientpvRequest $request)
    {
        $validatedData = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',


            ],
            'prenom' => [

                'string',
                'max:255',

            ],
            'localisation' => [

                'string',
                'max:255',

            ],
            'telephone' => [

                'string',
                'max:8',


            ],
            'ribbancaire' => [

                'string',
                'max:255',


            ],
            'pv_id' => [

                'string',
                'max:255',


            ]
        ]);

        $client = new clientpv();
        $client->name = $validatedData['name'];
        $client->prenom = $validatedData['prenom'];
        $client->localisation = $validatedData['localisation'];
        $client->telephone = $validatedData['telephone'];
        $client->ribbancaire = $validatedData['ribbancaire'];
        $client->pv_id = $validatedData['pv_id'];

        $client->save();

        return response()->json(['message' => 'client created successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(clientpv $clientpv)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(clientpv $clientpv)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateclientpvRequest $request, $id)
    {
        $client = clientpv::findOrFail($id);

        if ($request->input('name') === null) {
            $client->name = $client->name;
        } else {
            $client->name = $request->input('name');
        }

        if ($request->input('prenom') === null) {
            $client->prenom = $client->prenom;
        } else {
            $client->prenom = $request->input('prenom');
        }

        if ($request->input('localisation') === null) {
            $client->localisation = $client->localisation;
        } else {
            $client->localisation = $request->input('localisation');
        }

        if ($request->input('telephone') === null) {
            $client->telephone = $client->telephone;
        } else {
            $client->telephone = $request->input('telephone');
        }

        if ($request->input('ribbancaire') === null) {
            $client->ribbancaire = $client->ribbancaire;
        } else {
            $client->ribbancaire = $request->input('ribbancaire');
        }

        $client->save();

        return response()->json(['message' => 'Client updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(clientpv $clientpv)
    {
        //
    }
}
