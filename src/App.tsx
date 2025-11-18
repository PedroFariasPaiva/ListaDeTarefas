import { useState } from "react";

interface Tarefa {
  texto: string;
  concluida: boolean;
}

export default function TodoApp() {
  const [tarefa, setTarefa] = useState<string>("");
  const [lista, setLista] = useState<Tarefa[]>([]);

  function adicionar() {
    if (tarefa.trim() === "") return;
    const novaTarefa: Tarefa = {
      texto: tarefa,
      concluida: false,
    };
    setLista([...lista, novaTarefa]);
    setTarefa("");
  }

  function remover(index:number): void {
    const novaLista = lista.filter((_, i) => i !== index);
    setLista(novaLista);
  }

  function alternarConclusao(index:number): void {
    const novaLista = lista.map((item, i) =>
      i === index ? { ...item, concluida: !item.concluida } : item
    );
    setLista(novaLista);
  }

  const pendentes = lista.filter(item => !item.concluida).length;

  return (
    <div style={{ fontFamily: "Arial", maxWidth: "400px" }}>
      <h1>Lista de Tarefas</h1>
      <p>Você tem <strong>{pendentes}</strong> tarefas pendentes</p>

      <input type="text" placeholder="Digite uma tarefa" value={tarefa} onChange={(e) => setTarefa(e.target.value)}/>

      <button onClick={adicionar}>Adicionar</button>

      <ul>
        {lista.map((item, index) => (
          <li key={index} style={{ marginTop: "8px" }}>
            <span
              onClick={() => alternarConclusao(index)}
              style={{
                textDecoration: item.concluida ? "line-through" : "none",
                cursor: "pointer",
                marginRight: "10px"
              }}
            >
              {item.texto}
            </span>

            <button onClick={() => remover(index)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
