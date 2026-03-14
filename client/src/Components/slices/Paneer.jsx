import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const ITEM_TYPE = "SLICE";

const Paneer = ({ id, index, moveSlice }) => {
    const [{ isDragging }, drag, preview] = useDrag({
        type: ITEM_TYPE,
        item: { id, index, type: 'paneer' },
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
            className="w-[82%] h-10 md:h-14 bg-[#f8fafc] rounded-xl border-2 border-[#e2e8f0] mx-auto shadow-xs flex items-center justify-around overflow-hidden relative cursor-grab active:cursor-grabbing"
        >
            {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1.5 h-full bg-[#e2e8f0] rotate-45 opacity-50 scale-150 pointer-events-none"></div>
            ))}
        </motion.div>
    );
}

export default Paneer;
