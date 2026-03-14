import { useDragLayer } from 'react-dnd';
import AlooTikki from './slices/AlooTikki';
import Paneer from './slices/Paneer';
import Cheese from './slices/Cheese';
import Tomato from './slices/Tomato';
import Onion from './slices/Onion';
import Lettuce from './slices/Lettuce';

const componentMap = {
    aloo_tikki: AlooTikki,
    paneer: Paneer,
    cheese: Cheese,
    tomato: Tomato,
    onion: Onion,
    lettuce: Lettuce
};

const CustomDragLayer = () => {
    const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    if (!isDragging || !currentOffset) return null;

    const Component = componentMap[item.type];

    return (
        <div style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 99999,
            left: currentOffset.x,
            top: currentOffset.y,
            width: '500px',
        }}>
            {Component ? <Component /> : null}
        </div>
    );
};

export default CustomDragLayer;
