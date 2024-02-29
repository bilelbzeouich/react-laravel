<?php

namespace App\Http\Controllers;

use App\Models\pv;
use App\Http\Requests\StorepvRequest;
use App\Http\Requests\UpdatepvRequest;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;


class PvController extends Controller
{

    final  public function login(StorepvRequest $request): JsonResponse
    {
        $user = (new pv())->getUserByEmailOrPhone($request->all());

        if ($user && Hash::check($request->input('password'), $user->password)) {
            $user_data['token'] = $user->createToken($user->email)->plainTextToken;
            $user_data['name'] = $user->name;
            $user_data['email'] = $user->email;
            $user_data['phone'] = $user->phone;
            $user_data['id'] = $user->id;
            $user_data['localisation'] = $user->localisation;
            return response()->json($user_data);
        }
        throw ValidationException::withMessages([
            'email' => ['the provider credentials are incorrect']
        ]);
    }
    final public function logout(): JsonResponse
    {
        auth()->user()->currentAccessToken()->delete();
        return response()->json(['msg' => 'You have successfully logged out']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pv = pv::all();
        return response()->json($pv);
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
    public function store(StorepvRequest $request)
    {
        $validatedData = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'localisation' => [

                'string',
                'max:255',
            ],
            'telephone' => [

                'string',
                'max:255',

            ],
            'mail' => [

                'string',
                'max:255',

            ],
            'ribbancaire' => [

                'string',
                'max:255',

            ],
            'password' => [
                'required',
                'string',
                'max:255',
            ],
        ]);

        $pv = new Pv();
        $pv->name = $validatedData['name'];
        $pv->localisation = 'localisation';
        $pv->phone = 'telephone';
        $pv->email = $validatedData['mail'];
        $pv->rip_bancaire = 'ribbancaire';
        $pv->password = Hash::make($validatedData['password']);

        $pv->save();

        return response()->json(['message' => 'User created successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(pv $pv)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(pv $pv)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatepvRequest $request, $id)
    {
        $pv = pv::findOrFail($id);

        if ($request->input('name') === null) {
            $pv->name = $pv->name;
        } else {
            $pv->name = $request->input('name');
        }
        if ($request->filled('mail')) {
            $pv->email = $request->input('mail');
        } else {
            // Handle the case when the email field is not filled
            // For example, you can return a validation error response
            return response()->json(['error' => 'The email field is required for shut'], 422);
        }

        if ($request->input('phone') === null) {
            $pv->phone = $pv->phone;
        } else {
            $pv->phone = $request->input('phone');
        }
        if ($request->input('password') === null) {
            $pv->password = Hash::make($pv->password);
        } else {
            $pv->password = Hash::make($request->input('password'));
        }

        $pv->save();

        return response()->json(['message' => 'Category updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = pv::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully.']);
    }
}
