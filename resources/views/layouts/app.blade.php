<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ENSA Attendance</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-dark bg-primary mb-4 shadow">
        <div class="container">
            <span class="navbar-brand fw-bold">ENSA Smart Attendance</span>
            <span class="navbar-text text-white">Sprint 1</span>
        </div>
    </nav>

    <div class="container">
        @yield('content')
    </div>

    <footer class="text-center py-4 text-muted mt-5 border-top">
        &copy; 2025 Projet ENSA - Groupe Agile
    </footer>
</body>
</html>