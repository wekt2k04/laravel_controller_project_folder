@extends('layouts.app')

@section('content')

@php
    $seances = [
        (object) ['id' => 1, 'titre' => 'Cours Laravel (Simulation)', 'date_debut' => '2025-10-10 08:30'],
        (object) ['id' => 2, 'titre' => 'Cours UML (Simulation)', 'date_debut' => '2025-10-12 10:00'],
    ];
@endphp
<h2 class="mb-4">Liste des cours disponibles</h2>

<div class="table-responsive">
    <table class="table table-striped table-hover shadow-sm">
        <thead class="table-dark">
            <tr>
                <th>Titre du cours</th>
                <th>Date</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @foreach($seances as $seance)
            <tr>
                <td>{{ $seance->titre }}</td>
                <td>{{ $seance->date_debut }}</td>
                <td>
                    <a href="#" class="btn btn-primary btn-sm">Faire l'appel</a>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection