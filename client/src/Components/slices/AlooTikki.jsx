import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const ITEM_TYPE = "SLICE";

const AlooTikki = ({ id, index, moveSlice }) => {
    const [{ isDragging }, drag, preview] = useDrag({
        type: ITEM_TYPE,
        item: { id, index, type: 'aloo_tikki' },
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
            className="w-[85%] h-12 md:h-16 rounded-3xl mx-auto cursor-grab active:cursor-grabbing shadow-md border-b-4 relative overflow-hidden flex flex-wrap items-center justify-center gap-2 p-2"
            style={{ backgroundColor: '#a16207', borderColor: '#713f12' }}
        >
            {[...Array(8)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#854d0e] opacity-40 pointer-events-none"></div>
            ))}
        </motion.div>
    );
}

export default AlooTikki;
