import {
  Main2,
  Mae3,
  Img,
  ImgMais,
  TextCortados,
  ImgLinImg,
  Flextudo,
} from "./styles";
import { useState, useEffect } from "react";
import Carrinho from "./Carrinho";
import Filtro from "./Filtro";
import Main from "./Main/Main";



function Home() {
  const produtos = [
    {
      id: 1,
      nome: "Boneco Etê Extraterrestre",
      preco: 150.9,

      precoantigo: 274.9,
      imagem: "./et1.png",
    },

    {
      id: 2,
      nome: "Boneco Série Mandalorian",
      preco: 119.9,
      precoantigo: 159.9,

      imagem: "./mandalorian.png",
    },

    {
      id: 3,
      nome: "Boneco Baby Yoda",
      preco: 99.9,
      precoantigo: 189.9,

      imagem: "./babyyoda.png",
    },

    {
      id: 4,
      nome: "Nave Espacial USS Andrômeda - Star Trek",
      preco: 1899.9,
      precoantigo: 2740.9,

      imagem: "./naveespacialstartrek.png",
    },

    {
      id: 5,
      nome: "Réplica Millenium Falcon - Star Wars",
      preco: 1590.9,
      precoantigo: 2190.9,

      imagem: "./millenium.png",
    },

    {
      id: 6,
      nome: "Boneco Darth Vader",
      preco: 829.9,
      precoantigo: 1089.9,

      imagem: "./darth.png",
    },

    {
      id: 7,
      nome:"Bonecos Personagens Star Trek",
      preco: 229.9,
      precoantigo: 299.9,

      imagem: "./bonecos.jpg",
    },

    {
      id: 8,
      nome: "Boneco Obi-Wan Kenobi",
      preco: 1229.9,
      precoantigo: 2299.9,

      imagem: "./obiwan.png",
    },
    ];
  const [carrinho, setCarrinho] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [valorMinimo, setValorMinimo] = useState("");
  const [valorMaximo, setValorMaximo] = useState("");
  const [ordem, setOrdem] = useState("");

  const onChangeCarrinho = (event) => {
    setCarrinho(event.target.value);
  };

  const onChangeOrdem = (event) => {
    setOrdem(event.target.value);
  };

  //FUNÇÃO PARA COMPRA DE PRODUTOS NO CARRINHO
  const compraProduto = (produto) => {
    const novoCarrinho = [...carrinho];
    const produtoAdicionado = produto;

    const produtoExistente = novoCarrinho.find((produto) => {
      return produto.id === produtoAdicionado.id;
    });
    if (produtoExistente) {
      produtoExistente.quantidade++;
      produtoExistente.precototal =
        produtoExistente.quantidade * produtoExistente.preco;
    } else {
      novoCarrinho.push({
        ...produtoAdicionado,
        quantidade: 1,
        precototal: produtoAdicionado.preco,
      });
    }
    setCarrinho(novoCarrinho);
  };

  useEffect(() => {
    if (carrinho.length > 0) {
      const listaStringCarrinho = JSON.stringify(carrinho);
      localStorage.setItem("carrinho", listaStringCarrinho);
    }
  }, [carrinho]);

  useEffect(() => {
    const novoCarrinho = JSON.parse(localStorage.getItem("carrinho"));
    if (novoCarrinho !== null) {
      setCarrinho(novoCarrinho);
    }
  }, []);

  const somaTela = (produtos) => {
    produtos
      .filter((produto) => {
        return produto.nome.includes(pesquisa);
      })
      .filter((produto) => {
        return produto.preco >= valorMinimo;
      })
      .filter((produto) => {
        return valorMaximo ? produto.preco <= valorMaximo : produto;
      })
      .map((produto, index) => {
        return produto.length;
      });
  };
  return (
    <Flextudo>
      <Filtro
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        minimo={valorMinimo}
        setMinimo={setValorMinimo}
        maximo={valorMaximo}
        setMaximo={setValorMaximo}
      />
      
      <Main2>
      <div className="boxcentral-topo">
          <div>
            <h3>Quantidade de Produtos:</h3>
            <p>{produtos.length} produtos</p>
          </div>
          <div>
            <select
              value={ordem}
              onChange={onChangeOrdem}
              className="boxcentral-topo-select"
            >
              <option value="">Ordenar por</option>
              <option value="Maior">Preço: do maior para o menor</option>
              <option value="Menor">Preço: do menor para o maior</option>
            </select>
          </div>
        </div>
        <Mae3>
            
          {produtos
            //Busca de produto pelo nome
            .filter((produto) => {
              return produto.nome.includes(pesquisa);
            })
            //filtrar produtos a partir do menor valor
            .filter((produto) => {
              return produto.preco >= valorMinimo;
            })
            //filtrar produtos a partir do menor valor
            .filter((produto) => {
              return valorMaximo ? produto.preco <= valorMaximo : produto;
            })
            //Ordenar do maior e do menor
            .sort((a, b) => {
              switch (ordem) {
                case "Maior":
                  if (a.preco < b.preco) {
                    return 1;
                  } else {
                    return -1;
                  }
                case "Menor":
                  if (a.preco < b.preco) {
                    return -1;
                  } else {
                    return 1;
                  }
              }
            })
            // Comando para renderizar todos os produtos da loja
            .map((produto, index) => {
              return (
                <div key={index}>
                  <Img src={produto.imagem} alt="Produto-Loja" />
                  <ImgMais className="imagemmais">
                    <h1>{produto.nome}</h1>

                    <span
                      onClick={() => compraProduto(produto)}
                      onChange={onChangeCarrinho}
                    >
                      <svg
                        width="40"
                        height="40"
                        class="aaaaa"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 12c0-4.969-4.031-9-9-9s-9 4.031-9 9 4.031 9 9 9 9-4.031 9-9Z"></path>
                        <path d="M12 8.25v7.5"></path>
                        <path d="M15.75 12h-7.5"></path>
                      </svg>
                    </span>
                  </ImgMais>

                  <TextCortados className="textoscortados">
                    <ImgLinImg className="imglinimg">
                      <h2>R$ {produto.preco}0</h2>
                      <h4 className="vinicorte">R$ {produto.precoantigo}0</h4>
                    </ImgLinImg>
                    <p>POR TEMPO LIMITADO!</p>
                  </TextCortados>
                </div>
              );
            })}
        </Mae3>
      </Main2>
      <Carrinho cesta={carrinho} setCesta={setCarrinho} />
    </Flextudo>
  );
}


export default Home;
