<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
  public function register(Request $request)
  {
    $validatedData = $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users',
      'password' => 'required|string|min:8',
      'role' => 'required|in:etudiant,prof,admin',
      'filiere_id' => 'nullable|exists:filieres,id',
    ]);

    $user = User::create([
      'name' => $validatedData['name'],
      'email' => $validatedData['email'],
      'password' => Hash::make($validatedData['password']),
      'role' => $validatedData['role'],
      'filiere_id' => $validatedData['filiere_id'] ?? null,
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
      'access_token' => $token,
      'token_type' => 'Bearer',
      'user' => $user
    ], 201);
  }

  public function login(Request $request)
  {
    $credentials = $request->validate([
      'email' => 'required|email',
      'password' => 'required',
    ]);

    if (Auth::attempt($credentials)) {
      $user = Auth::user();
      $token = $user->createToken('auth_token')->plainTextToken;

      // Charger la filière si c'est un étudiant
      if ($user->role === 'etudiant') {
        $user->load('filiere');
      }

      return response()->json([
        'access_token' => $token,
        'token_type' => 'Bearer',
        'user' => $user
      ]);
    }

    return response()->json(['message' => 'Identifiants incorrects'], 401);
  }

  public function logout(Request $request)
  {
    /** @var \Laravel\Sanctum\PersonalAccessToken $accessToken */
    $accessToken = $request->user()->currentAccessToken();

    $accessToken->delete();

    return response()->json(['message' => 'Déconnexion réussie']);
  }
}
