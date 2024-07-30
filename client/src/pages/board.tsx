import Header from "../components/header";
import Filterbar from "../components/filterbar";
import Column from "../components/column";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

const defaultColumns = [
  [
    {
      id: " 1",
      title: "Create navbar component",
      user: "Sora",
    },
    {
      id: "2",
      title: "Create navbar component",
      user: "Sora",
    },
    {
      id: "3",
      title: "Create navbar component",
      user: "Sora",
    },
  ],
  [
    {
      id: "4",
      title: "Create Sidebar component",
      user: "Nora",
    },
    {
      id: "5",
      title: "Create Sidebar component",
      user: "Nora",
    },
    {
      id: "6",
      title: "Create Sidebar component",
      user: "Nora",
    },
  ],
  [
    {
      id: "7",
      title: "Create dashboard component",
      user: "Dora",
    },
    {
      id: "8",
      title: "Create dashboard component",
      user: "Dora",
    },
    {
      id: "9",
      title: "Create dashboard component",
      user: "Dora",
    },
  ],
];
console.log(defaultColumns);

const Board = () => {
  const dragHandler = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const sourceColumn = defaultColumns[Number(source.droppableId)];
    const destinationColumn = defaultColumns[Number(destination.droppableId)];
    const [removed] = sourceColumn.splice(source.index, 1);
    destinationColumn.splice(destination.index, 0, removed);
    console.log(defaultColumns);
  };

  return (
    <div className="w-full px-8 overflow-hidden ">
      <Header />
      <Filterbar />
      <div className="flex gap-2 w-full overflow-x-auto scrollbar ">
        <DragDropContext onDragEnd={dragHandler}>
          {defaultColumns.map((column, index) => (
            <Column id={index} key={index} title={column} />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
