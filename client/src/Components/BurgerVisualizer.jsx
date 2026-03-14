import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import useBurgerStore from '../store/burgerStore.js';
import Slice from './Slice.jsx';

const BurgerVisualizer = () => {
  const { slices, reorderSlices } = useBurgerStore();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderSlices(result.source.index, result.destination.index);
  };

  return (
    <div className="flex flex-col items-center justify-end min-h-[400px] w-full max-w-sm mx-auto p-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-orange-100 relative mt-8">
      <div className="absolute top-4 right-4 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
        Layers: {slices.length} / 10
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="burger-droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col items-center w-full min-h-[200px] justify-end space-y-[-10px] pb-4 px-4 overflow-visible relative z-10"
            >
              {slices.map((slice, index) => (
                <Draggable 
                  key={slice.id} 
                  draggableId={slice.id} 
                  index={index}
                  isDragDisabled={slice.type === 'bread'}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`w-full flex justify-center ${snapshot.isDragging ? 'z-50' : 'z-10'} relative`}
                      style={{
                        ...provided.draggableProps.style,
                      }}
                    >
                      <Slice type={slice.type} isTop={index === 0} isBottom={index === slices.length - 1} id={slice.id} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      {/* Plate / Tray visualization */}
      <div className="w-[320px] h-6 bg-slate-300 rounded-[100%] absolute bottom-2 -z-10 shadow-lg border-b-4 border-slate-400"></div>
      <div className="w-[280px] h-4 bg-slate-200 rounded-[100%] absolute bottom-3 -z-10"></div>
    </div>
  );
};

export default BurgerVisualizer;
