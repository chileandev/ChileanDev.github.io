function searchWiki() {
        var query = document.getElementById("wiki-search").value.toLowerCase();
        var results = [];

        // Se obtiene todo el texto de la wiki para buscar en él
        var sections = document.querySelectorAll("h2, h3, p");
        sections.forEach(function(section) {
            if (section.textContent.toLowerCase().includes(query)) {
                results.push(section.outerHTML);
            }
        });

        // Muestra los resultados
        document.getElementById("search-results").innerHTML = results.length > 0 ? results.join("<hr>") : "No se encontraron resultados.";
}
