import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const ITEM_TYPE = "SLICE";

const Cheese = ({ id, index, moveSlice }) => {
    const [{ isDragging }, drag, preview] = useDrag({
        type: ITEM_TYPE,
        item: { id, index, type: 'cheese' },
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
            className="w-[90%] h-4 md:h-6 bg-yellow-400 rounded-md mx-auto z-10 drop-shadow-sm border-b-2 border-yellow-500 cursor-grab active:cursor-grabbing"
        >
        </motion.div>
    );
}

export default Cheese;
