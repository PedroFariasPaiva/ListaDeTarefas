import { useState, useEffect } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [ordenacao, setOrdenacao] = useState("asc");
  const [loading, setLoading] = useState(true);

  // Estados da paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 2; // ⭐ configure aqui quantos usuários aparecem por página

  useEffect(() => {
    const timerId = setTimeout(() => {
      const loadedArray = [
        { id: 1, nome: "Ana", idade: 28 },
        { id: 2, nome: "Carlos", idade: 35 },
        { id: 3, nome: "Bruna", idade: 22 },
        { id: 4, nome: "Daniel", idade: 30 }
      ];

      setUsuarios(loadedArray);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timerId);
  }, []);

  // Filtro + ordenação (tudo antes da paginação)
  const listaProcessada = usuarios
    .filter((u) => u.nome.toLowerCase().includes(filtro.toLowerCase()))
    .sort((a, b) =>
      ordenacao === "asc" ? a.idade - b.idade : b.idade - a.idade
    );

  // Resetar para página 1 quando filtrar
  useEffect(() => {
    setPaginaAtual(1);
  }, [filtro]);

  // Calcular total de páginas
  const totalPaginas = Math.ceil(listaProcessada.length / itensPorPagina);

  // Recorte da página atual
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const paginaExibida = listaProcessada.slice(inicio, fim);

  return (
    <div>
      <h1>Dashboard de Usuários</h1>

      {/* Campo de filtro */}
      <input
        type="text"
        placeholder="Filtrar por nome"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      {/* Ordenação */}
      <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
        <option value="asc">Idade crescente</option>
        <option value="desc">Idade decrescente</option>
      </select>

      {/* Loading */}
      {loading && <p>Carregando...</p>}

      {/* Lista vazia */}
      {!loading && listaProcessada.length === 0 && (
        <p>Nenhum usuário encontrado.</p>
      )}

      {/* Lista paginada */}
      {!loading && listaProcessada.length > 0 && (
        <>
          <ul>
            {paginaExibida.map((u) => (
              <li key={u.id}>
                {u.nome} — {u.idade} anos
              </li>
            ))}
          </ul>

          {/* Paginação */}
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => setPaginaAtual((p) => p - 1)}
              disabled={paginaAtual === 1}
            >
              Anterior
            </button>

            <span style={{ margin: "0 10px" }}>
              Página {paginaAtual} de {totalPaginas}
            </span>

            <button
              onClick={() => setPaginaAtual((p) => p + 1)}
              disabled={paginaAtual === totalPaginas}
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
}
