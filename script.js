document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".menu a");
    const sections = document.querySelectorAll(".content");

    // Textos por sección para el efecto de escritura
    const texts = {
        home: "$ WELCOME TO TILDE.CLUB |",
        wiki: "$ PROGRAMACIÓN Y BASE DE DATOS |",
        donate: "$ DISEÑO Y DESARROLLO WEB |",
        chat: "$ CREACIÓN, DISEÑO Y DESARROLLO DE PROYECTOS |",
        signup: "$ CREATE YOUR ACCOUNT |"
    };

    // Función para mostrar una sección y animar su título █
    function showSection(id) {
        sections.forEach(section => {
            section.classList.remove("active");
        });

        const target = document.getElementById(id);
        if (target) {
            target.classList.add("active");

            // Remover clase 'active' de todos los enlaces del menú
            links.forEach(link => {
                link.classList.remove("active");
                link.style.transition = "background-color 0.3s ease"; // Restablecer transición
            });

            // Añadir clase 'active' solo al enlace correspondiente
            const activeLink = Array.from(links).find(link => link.getAttribute("data-section") === id);
            if (activeLink) {
                activeLink.classList.add("active");
            }

            animateTypingText(target, texts[id]);
        }
    }

    // Efecto de máquina de escribir
    function animateTypingText(section, text) {
        const title = section.querySelector("h1 .cursor").parentElement;
        let index = 0;

        title.innerHTML = '<span class="cursor">_</span>'; // Limpiar contenido previo

        function type() {
            if (index <= text.length) {
                title.innerHTML = text.substring(0, index) + '<span class="cursor">█</span>';
                index++;
                setTimeout(type, 100); // Velocidad de escritura
            }
        }

        type();
    }

    // Manejar clicks en el menú
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute("data-section");
            showSection(sectionId);
        });
    });

    // Opcional: Quitar el foco visual después de hacer clic
    links.forEach(link => {
        link.addEventListener("blur", function () {
            this.style.outline = "none";
        });
    });

    // Mostrar HOME por defecto
    showSection("home");
});