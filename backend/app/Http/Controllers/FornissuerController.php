<?php

namespace App\Http\Controllers;

use App\Models\fornissuer;
use App\Http\Requests\StorefornissuerRequest;
use App\Http\Requests\UpdatefornissuerRequest;
use Illuminate\Validation\Rule;

class FornissuerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $client = fornissuer::all();
        return response()->json($client);
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
    public function store(StorefornissuerRequest $request)
    {
        $validatedData = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',

            ],
            'localisation' => [
                'required',
                'string',
                'max:255',

            ],
            'telephone' => [
                'required',
                'string',
                'max:255',
                Rule::unique('fornissuers')

            ],
            'mail' =>
            [
                'required',
                'string',
                'max:255',
                Rule::unique('fornissuers')

            ],
            'ribbancaire' =>   [
                'required',
                'string',
                'max:255',
                Rule::unique('fornissuers')

            ],




        ]);

        $user = new fornissuer();
        $user->name = $validatedData['name'];
        $user->localisation = $validatedData['localisation'];
        $user->telephone = $validatedData['telephone'];
        $user->mail = $validatedData['mail'];
        $user->ribbancaire = $validatedData['ribbancaire'];



        $user->save();

        return response()->json(['message' => 'user created successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(fornissuer $fornissuer)
    {
        //
    }
    public function fornissuertName($id)
    {
        // Find the category by its ID
        $fornissuer = fornissuer::findOrFail($id);

        // Retrieve the category name
        $fornissuertName = $fornissuer;

        // Return the category name as a JSON response
        return response()->json($fornissuertName);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(fornissuer $fornissuer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatefornissuerRequest $request, $id)
    {
        $fornissuer = Fornissuer::findOrFail($id);

        if ($request->input('name') === null) {
            $fornissuer->name = $fornissuer->name;
        } else {
            $fornissuer->name = $request->input('name');
        }

        if ($request->input('localisation') === null) {
            $fornissuer->localisation = $fornissuer->localisation;
        } else {
            $fornissuer->localisation = $request->input('localisation');
        }

        if ($request->input('telephone') === null) {
            $fornissuer->telephone = $fornissuer->telephone;
        } else {
            $fornissuer->telephone = $request->input('telephone');
        }

        if ($request->input('mail') === null) {
            $fornissuer->mail = $fornissuer->mail;
        } else {
            $fornissuer->mail = $request->input('mail');
        }

        if ($request->input('ribbancaire') === null) {
            $fornissuer->ribbancaire = $fornissuer->ribbancaire;
        } else {
            $fornissuer->ribbancaire = $request->input('ribbancaire');
        }

        $fornissuer->save();

        return response()->json(['message' => 'Fornissuer updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $client = fornissuer::findOrFail($id);
        $client->delete();
        return response()->json(['message' => 'client deleted successfully.']);
    }
}
