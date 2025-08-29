/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
// FIX: Corrected import path for Product type.
import { Product } from './types';

interface ObjectCardProps {
    product: Product;
    isSelected: boolean;
    onClick?: () => void;
    rotation?: number;
}

const ObjectCard: React.FC<ObjectCardProps> = ({ product, isSelected, onClick, rotation = 0 }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const cardClasses = `
        bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300
        ${onClick ? 'cursor-pointer hover:shadow-xl hover:scale-105' : ''}
        ${isSelected ? 'border-2 border-blue-500 shadow-xl' : 'border border-zinc-200'}
    `;

    // Only apply 3D effect to the main selected product card
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isSelected || !cardRef.current) return;
        
        const card = cardRef.current;
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
        const x = clientX - left;
        const y = clientY - top;
    
        const centerX = width / 2;
        const centerY = height / 2;
    
        const deltaX = x - centerX;
        const deltaY = y - centerY;
    
        // Sensitivity factor for rotation
        const rotateX = (deltaY / centerY) * -12; // Invert for natural feel
        const rotateY = (deltaX / centerX) * 12;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.1, 1.1, 1.1)`;
        card.style.transition = 'transform 0.05s ease-out'; // Faster transition while moving
    
        const img = card.querySelector('img');
        if (img) {
            img.style.transform = `rotate(${rotation}deg) translateZ(40px)`;
        }
    };

    const handleMouseLeave = () => {
        if (!isSelected || !cardRef.current) return;
        
        const card = cardRef.current;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Slower transition on leave
    
        const img = card.querySelector('img');
        if (img) {
            img.style.transform = `rotate(${rotation}deg) translateZ(0px)`;
        }
    };

    return (
        <div 
            ref={cardRef}
            className={cardClasses} 
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={ isSelected ? { transformStyle: "preserve-3d" } : {} }
        >
            <div className="aspect-square w-full bg-zinc-100 flex items-center justify-center p-4" style={ isSelected ? { transformStyle: "preserve-3d" } : {} }>
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-contain transition-transform duration-300"
                    style={{ transform: `rotate(${rotation}deg)` }}
                />
            </div>
            <div className="p-3 text-center">
                <h4 className="text-sm font-semibold text-zinc-700 truncate">{product.name}</h4>
            </div>
        </div>
    );
};

export default ObjectCard;
