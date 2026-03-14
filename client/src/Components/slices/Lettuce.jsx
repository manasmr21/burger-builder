import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const ITEM_TYPE = "SLICE";

const Lettuce = ({ id, index, moveSlice }) => {
    const [{ isDragging }, drag, preview] = useDrag({
        type: ITEM_TYPE,
        item: { id, index, type: 'lettuce' },
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
            className="w-[95%] h-6 md:h-8 bg-green-500 rounded-3xl mx-auto shadow-sm flex items-center justify-around z-10 border-b-[3px] border-green-600 cursor-grab active:cursor-grabbing"
        >
            {[...Array(6)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-green-400 rounded-full -mt-4 opacity-50 pointer-events-none"></div>
            ))}
        </motion.div>
    );
}

export default Lettuce;
