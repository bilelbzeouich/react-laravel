<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartepvController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ClientpvController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\EmplacementController;
use App\Http\Controllers\EmplacementpvController;
use App\Http\Controllers\FacturationController;
use App\Http\Controllers\FornissuerController;
use App\Http\Controllers\LivraisonsController;
use App\Http\Controllers\ProduitsController;
use App\Http\Controllers\PvController;
use App\Http\Controllers\RapprotController;
use App\Http\Controllers\SocieteController;
use App\Http\Controllers\StockpvController;
use App\Http\Controllers\UserController;
use App\Models\cartepv;
use App\Models\emplacementpv;
use App\Models\facturation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [AuthController::class, 'login']);
Route::post('loginpv', [PvController::class, 'login']);

Route::group(
    ['middleware' => 'auth:sanctum'],
    function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('logoutpv', [PvController::class, 'logout']);
        Route::put('/logoutpv/{id}', [PvController::class, 'update']);
        Route::put('/updatepv/{id}', [AuthController::class, 'update']);
        Route::delete('/deletepv/{id}', [PvController::class, 'destroy']);
        Route::get('user', [UserController::class, 'store']);
        Route::apiResource('category', CategoryController::class);
        Route::get('categories', [CategoryController::class, 'index']);
        Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
        Route::apiResource('emplacement', EmplacementController::class);
        Route::get('emplacement', [EmplacementController::class, 'index']);
        Route::delete('/emplacement/{id}', [EmplacementController::class, 'destroy']);
        Route::apiResource('client', ClientController::class);
        Route::get('client', [ClientController::class, 'index']);
        Route::delete('/client/{id}', [ClientController::class, 'destroy']);
        Route::apiResource('fournissuer', FornissuerController::class);
        Route::get('fournissuer', [FornissuerController::class, 'index']);
        Route::delete('/for/{id}', [FornissuerController::class, 'destroy']);
        Route::apiResource('produit', ProduitsController::class);
        Route::get('produit', [ProduitsController::class, 'index']);
        Route::get('notif', [ProduitsController::class, 'notif']);
        Route::get('notifdate', [ProduitsController::class, 'notifdate']);
        Route::delete('/produit/{id}', [ProduitsController::class, 'destroy']);
        Route::get('/product/{id}', [ProduitsController::class, 'getCategoryName']);
        Route::get('/productfr/{id}', [ProduitsController::class, 'indexfr']);
        Route::apiResource('livraison', LivraisonsController::class);
        Route::get('livraison', [LivraisonsController::class, 'index']);
        Route::get('livraisonref/{id}', [LivraisonsController::class, 'indexref']);
        Route::get('livraisoncl/{id}', [LivraisonsController::class, 'indexcl']);
        Route::delete('livraisonss/{id}', [LivraisonsController::class, 'destroy']);
        Route::get('/categories/{id}', [CategoryController::class, 'getCategoryName']);
        Route::put('/categories/{id}', [CategoryController::class, 'update']);
        Route::get('/emplacements/{id}',  [EmplacementController::class, 'emplacementName']);
        Route::put('/emplacement/{id}', [EmplacementController::class, 'update']);
        Route::get('/clients/{id}',  [ClientController::class, 'clienttName']);
        Route::put('/clients/{id}', [ClientController::class, 'update']);
        Route::get('/fournissuers/{id}',  [FornissuerController::class, 'fornissuertName']);
        Route::put('/fournissuer/{id}', [FornissuerController::class, 'update']);
        Route::get('/products/{id}',  [ProduitsController::class, 'productName']);
        Route::put('/produitup/{id}', [ProduitsController::class, 'update']);
        Route::post('/change-password', [AuthController::class, 'changePassword']);
        Route::apiResource('pv', PvController::class);
        Route::get('pvs', [PvController::class, 'index']);
        Route::apiResource('emplacementpv', EmplacementpvController::class);
        Route::get('/emplacementpvs/{id}',  [EmplacementpvController::class, 'index']);
        Route::get('/emplacementspv/{id}',  [EmplacementpvController::class, 'emplacementName']);
        Route::put('/emplacementspvs/{id}', [EmplacementpvController::class, 'update']);
        Route::apiResource('clientpv', ClientpvController::class);
        Route::get('/clientpvs/{id}',  [ClientpvController::class, 'index']);
        Route::get('/clientspvs/{id}',  [ClientpvController::class, 'clienttName']);
        Route::put('/clientpvs/{id}', [ClientpvController::class, 'update']);
        Route::apiResource('caretpv', CartepvController::class);
        Route::get('/caretpvs/{id}',  [CartepvController::class, 'index']);
        Route::delete('/card/{id}', [CartepvController::class, 'destroy']);
        Route::apiResource('commande', CommandeController::class);
        Route::get('/commandes/{id}',  [CommandeController::class, 'index']);
        Route::delete('/commandepv/{id}', [CommandeController::class, 'destroy']);
        Route::get('/commandeview/{id}',  [CommandeController::class, 'commandeview']);
        Route::get('/commandeviews',  [CommandeController::class, 'commandeviews']);
        Route::put('/commandepvs/{id}', [CommandeController::class, 'update']);
        Route::get('/stockpv/{id}',  [StockpvController::class, 'index']);
        Route::get('/indexnotif/{id}',  [StockpvController::class, 'indexnotif']);
        Route::get('/indexnqte/{id}',  [StockpvController::class, 'indexnqte']);
        Route::get('/productpv/{id}', [ProduitsController::class, 'indexpv']);
        Route::apiResource('facturation', FacturationController::class);
        Route::get('/rapport',  [RapprotController::class, 'index']);
        Route::get('/societe',  [SocieteController::class, 'index']);
        Route::put('/societe/{id}', [SocieteController::class, 'update']);
    }

);
