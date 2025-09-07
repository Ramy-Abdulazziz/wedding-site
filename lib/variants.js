export const textContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.25,
        },
    },
};

export const textItem = {
    hidden: { opacity: 0, y: 5 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: "easeOut",
        },
    },
};

export const attentionItem = {
    attention: {
        rotate: [0, 2, -2, 2, -2, 1, -1, 0],
        y: [-2, 0],
        transition: {
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
        },
    },
};

export const attentionDownItem = {
    attention: {
        y:[-5,0, -5],
        scale:[1.2, 1, 1.2],
        transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};
