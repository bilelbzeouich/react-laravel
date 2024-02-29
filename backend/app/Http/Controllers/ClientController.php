<?php

namespace App\Http\Controllers;

use App\Models\client;
use App\Http\Requests\StoreclientRequest;
use App\Http\Requests\UpdateclientRequest;
use Illuminate\Validation\Rule;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $client = client::all();
        return response()->json($client);
    }

    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreclientRequest $request)
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
                Rule::unique('clients')

            ],
            'ribbancaire' => [

                'string',
                'max:255',
                Rule::unique('clients')

            ]
        ]);

        $client = new client();
        $client->name = $validatedData['name'];
        $client->prenom = $validatedData['prenom'];
        $client->localisation = $validatedData['localisation'];
        $client->telephone = $validatedData['telephone'];
        $client->ribbancaire = $validatedData['ribbancaire'];

        $client->save();

        return response()->json(['message' => 'client created successfully.']);
    }
    public function clienttName($id)
    {
        // Find the category by its ID
        $client = client::findOrFail($id);

        // Retrieve the category name
        $clienttName = $client;

        // Return the category name as a JSON response
        return response()->json($clienttName);
    }
    /**
     * Display the specified resource.
     */
    public function show(client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateclientRequest $request, $id)
    {
        $client = Client::findOrFail($id);

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
    public function destroy($id)
    {
        $client = client::findOrFail($id);
        $client->delete();
        return response()->json(['message' => 'client deleted successfully.']);
    }
}
