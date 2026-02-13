export interface Social {
    name: string;
    url: string;
    icon: string;
    platform: string;
    color?: string;
    darkColor?: string;
}

export interface Experience {
    company: string;
    period: string;
    description: string;
}

export interface Project {
    title: string;
    description: string;
    tags: string[];
    link?: string;
}
