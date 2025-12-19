<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Seance;

class SeanceController extends Controller{
    public function index(){
        $seances = Seance::all();
        return response()->json($seances);
    }
    
    public function create(){}
    
    public function store(Request $request){}
    
    public function show(string $id){}
    
    public function edit(string $id){}
    
    public function update(Request $request, string $id){}
    
    public function destroy(string $id)
    {}
}
