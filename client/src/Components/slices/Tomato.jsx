import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const ITEM_TYPE = "SLICE";

const Tomato = ({ id, index, moveSlice }) => {
    const [{ isDragging }, drag, preview] = useDrag({
        type: ITEM_TYPE,
        item: { id, index, type: 'tomato' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item) {
            if (item.index !== index) {
                moveSlice(item.index, index);
                item.index = index;
            }
        }
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    return (
        <motion.div
            ref={(node) => drag(drop(node))}
            initial={{ opacity: 1 }}
            animate={{ opacity: isDragging ? 0.4 : 1 }}
            className="w-[85%] h-6 md:h-8 bg-red-500 rounded-full mx-auto shadow-sm border-2 border-red-600 flex justify-around items-center gap-2 overflow-hidden px-4 cursor-grab active:cursor-grabbing"
        >
            {[...Array(4)].map((_, i) => (
                <div key={i} className="w-4 h-2 bg-red-700 rounded-full opacity-60 pointer-events-none"></div>
            ))}
        </motion.div>
    );
}

export default Tomato;
