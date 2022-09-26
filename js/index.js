let nombreImagenes = [],
  contador = 0,
  contadorAciertos = 0;
const divContenedorCartas = document.querySelector(".contenedorCartas");
const numCartas = 16;
const imagenesRandom = [];
const arrayComprobaciones = [];
const imagenes = [
  {
    id: 1,
    src: "img/articuno.png",
  },
  {
    id: 2,
    src: "img/blastoise.png",
  },
  {
    id: 3,
    src: "img/charizard.png",
  },
  {
    id: 4,
    src: "img/meow.png",
  },
  {
    id: 5,
    src: "img/moltres.png",
  },
  {
    id: 6,
    src: "img/pikachu.png",
  },
  {
    id: 7,
    src: "img/venosour.png",
  },
  {
    id: 8,
    src: "img/zapdos.png",
  },
  {
    id: 9,
    src: "img/articuno.png",
  },
  {
    id: 10,
    src: "img/blastoise.png",
  },
  {
    id: 11,
    src: "img/charizard.png",
  },
  {
    id: 12,
    src: "img/meow.png",
  },
  {
    id: 13,
    src: "img/moltres.png",
  },
  {
    id: 14,
    src: "img/pikachu.png",
  },
  {
    id: 15,
    src: "img/venosour.png",
  },
  {
    id: 16,
    src: "img/zapdos.png",
  },
];

function crearCuadroCartas(numCartas) {
  for (let index = 0; index < numCartas; index++) {
    crearCard(index);
  }
  generarCartasAleatoria();
}

function generarCartasAleatoria() {
  for (let index = 1; index <= numCartas; ) {
    let num = Math.ceil(Math.random() * numCartas);
    if (!arrayComprobaciones.includes(num)) {
      arrayComprobaciones.push(num);
      imagenesRandom[index - 1] = {
        id: num,
        src: imagenes[num - 1].src,
      };
      index++;
    } else {
      continue;
    }
  }
}

function crearCard(index) {
  const div = document.createElement("div");
  div.classList.add("card");
  div.id = "card";
  const img = document.createElement("img");
  img.classList.add("img" + (index + 1));
  img.id = "img" + (index + 1);
  img.src = "img/question.png";
  img.addEventListener("click", asignarClickCarta);
  div.appendChild(img);
  divContenedorCartas.appendChild(div);
}

function asignarClickCarta(img) {
  let numeroImagenId = parseInt(img.target.id.replace("img", ""));
  img.target.src = imagenesRandom[numeroImagenId - 1].src;
  contador++;
  nombreImagenes.push({
    id: numeroImagenId,
    src: imagenesRandom[numeroImagenId - 1].src,
  });
  setTimeout(() => {
    comprobarCombinacionCarta(contador, nombreImagenes, img);
  }, 150);
}

function comprobarCombinacionCarta(contador, arrayNombreImagenes, img) {
  if (contador % 2 === 0 && arrayNombreImagenes.length % 2 === 0) {
    if (arrayNombreImagenes[0].src !== arrayNombreImagenes[1].src) {
      for (let index = 0; index < arrayNombreImagenes.length; index++) {
        document.getElementById("img" + arrayNombreImagenes[index].id).src =
          "img/question.png";
      }
      reasignarEventoClick(nombreImagenes);
      nombreImagenes = [];
    } else {
      for (let index = 0; index < arrayNombreImagenes.length; index++) {
        document.getElementById(
          "img" + arrayNombreImagenes[index].id
        ).parentNode.style.pointerEvents = "none";
      }
      nombreImagenes = [];
      contadorAciertos++;
      aciertos(contadorAciertos);
    }
  } else {
    img.target.parentNode.style.pointerEvents = "none";
  }
}

function reasignarEventoClick(nombreImagenes) {
  for (let index = 0; index < nombreImagenes.length; index++) {
    document.getElementById(
      "img" + nombreImagenes[index].id
    ).parentNode.style.pointerEvents = "";
  }
}

function aciertos(contadorAciertos) {
  if (contadorAciertos === 8) {
    alert("Enhorabuena, has conseguido todas las combinaciones");
    contadorAciertos = 0;
    window.location.reload();
  }
  return;
}

crearCuadroCartas(numCartas);
