import {ChartNoAxesGantt, ChevronDown, Code, Dice6, Ellipsis, Fullscreen, Goal, List, NotebookText, Plus, Settings, Share, Star, Zap} from 'lucide-react'

export const sidebarlist=[
    {
        name:'Timeline',
        icon:<ChartNoAxesGantt />,
        url:'timeline'
    },
    {
        name:'Board',
        icon:<Dice6 />,
        url:'board'
    },
    {
        name:'List',
        icon:<List />,
        url:'list'
    },
    {
        name:'Goals',
        icon:<Goal />,
        url:'goals'
    },
    {
        name:'Add View',
        icon:<Plus />,
        url:'view'
    },
]

export const development=[
    {
        name:'Code',
        icon:<Code/>
    }
]


export const setting=[
    {
        name:'Project pages',
        icon:<NotebookText />
    },
    {
        name:'Project settings',
        icon:<Settings />
    },
]


export const navlist=[
    {
        name:'Your work',
        icon:<ChevronDown size={20} strokeWidth={0.6} />
    },
    {
        name:'Projects',
        icon:<ChevronDown size={20} strokeWidth={0.6} />
    },
    {
        name:'Filters',
        icon:<ChevronDown size={20} strokeWidth={0.6} />
    },
    {
        name:'Dashboards',
        icon:<ChevronDown size={20} strokeWidth={0.6} />
    },
    {
        name:'Teams',
        icon:<ChevronDown size={20} strokeWidth={0.6} />
    },
    {
        name:'Apps',
        icon:<ChevronDown size={20} strokeWidth={0.6} />
    },
]

export const headerIcon=[
    {
        name:'',
        icon:<Zap />
    },
    {
        name:'',
        icon:<Star />
    },
    {
        name:'',
        icon:<Share />
    },
    {
        name:'',
        icon:<Fullscreen />
    },
    {
        name:'',
        icon:<Ellipsis />
    },
]


export const selectList=[
    {
        name:'None',
        value:'none'
    },
    {
        name:'Assignee',
        value:'assignee'
    },
    {
        name:'Subtask',
        value:'subtask'
    },
]