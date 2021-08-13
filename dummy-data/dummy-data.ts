interface User {
    id: number | string
    email: string
    password: string
    logged: false
}

interface Article {
    id: number | string
    title: string
    content: string
    author: string
    date: string
}


const USERS: User[] = [
    {
        id: 1,
        email: "b.welzel81@gmail.com",
        password: "password123!",
        logged: false
    },
    {
        id: 2,
        email: "chick@pynchon.com",
        password: "AgainstTheDay!",
        logged: false
    },
    {
        id: 3,
        email: "hal@wallace.com",
        password: "InfiniteJest!",
        logged: false
    },
    {
        id: 4,
        email: "chip@franzen.com",
        password: "TheCorrections!",
        logged: false
    },
    {
        id: 5,
        email: "nick@delillo.com",
        password: "Underworld!",
        logged: false
    }
]

const ARTICLES: Article[] = [
    {
        id: 1,
        title: "Behemoth",
        content: "He as compliment unreserved projecting. Between had observe pretend delight for believe. Do newspaper questions consulted sweetness do. Our sportsman his unwilling fulfilled departure law. Now world own total saved above her cause table. Wicket myself her square remark the should far secure sex. Smiling cousins warrant law explain for whether. Same an quit most an. Admitting an mr disposing sportsmen. Tried on cause no spoil arise plate. Longer ladies valley get esteem use led six. Middletons resolution advantages expression themselves partiality so me at. West none hope if sing oh sent tell is. ",
        author: "Benjamin Welzel",
        date: 'August 13, 2021 13:45:00'
    },
    {
        id: 2,
        title: "Gravity's Rainbow",
        content: "In it except to so temper mutual tastes mother. Interested cultivated its continuing now yet are. Out interested acceptance our partiality affronting unpleasant why add. Esteem garden men yet shy course. Consulted up my tolerably sometimes perpetual oh. Expression acceptance imprudence particular had eat unsatiable. Brother set had private his letters observe outward resolve. Shutters ye marriage to throwing we as. Effect in if agreed he wished wanted admire expect. Or shortly visitor is comfort placing to cheered do. Few hills tears are weeks saw. Partiality insensible celebrated is in. Am offended as wandered thoughts greatest an friendly. Evening covered in he exposed fertile to. Horses seeing at played plenty nature to expect we. Young say led stood hills own thing get. ",
        author: "Thomas Pynchon",
        date: 'August 10, 2005 09:56:00'
    },
    {
        id: 3,
        title: "Inherent Vice",
        content: "In on announcing if of comparison pianoforte projection. Maids hoped gay yet bed asked blind dried point. On abroad danger likely regret twenty edward do. Too horrible consider followed may differed age. An rest if more five mr of. Age just her rank met down way. Attended required so in cheerful an. Domestic replying she resolved him for did. Rather in lasted no within no.",
        author: "Thomas Pynchon",
        date: 'July 5, 2002 12:43:00'
    },
    {
        id: 4,
        title: "White Noise",
        content: "Compliment interested discretion estimating on stimulated apartments oh. Dear so sing when in find read of call. As distrusts behaviour abilities defective is. Never at water me might. On formed merits hunted unable merely by mr whence or. Possession the unpleasing simplicity her uncommonly. ",
        author: "Don Delillo",
        date: 'December 24, 2006 12:43:00'
    },
    {
        id: 5,
        title: "The Body Artist",
        content: "Situation admitting promotion at or to perceived be. Mr acuteness we as estimable enjoyment up. An held late as felt know. Learn do allow solid to grave. Middleton suspicion age her attention. Chiefly several bed its wishing. Is so moments on chamber pressed to. Doubtful yet way properly answered humanity its desirous. Minuter believe service arrived civilly add all. Acuteness allowance an at eagerness favourite in extensive exquisite ye.",
        author: "Don Delillo",
        date: 'January 9, 2002 12:43:00'
    },
    {
        id: 6,
        title: "Girl with Curious Hair",
        content: "He difficult contented we determine ourselves me am earnestly. Hour no find it park. Eat welcomed any husbands moderate. Led was misery played waited almost cousin living. Of intention contained is by middleton am. Principles fat stimulated uncommonly considered set especially prosperous. Sons at park mr meet as fact like. ",
        author: "David Wallace",
        date: 'February 17, 1974 12:43:00'
    },
    {
        id: 7,
        title: "The Broom of the System",
        content: "Situation admitting promotion at or to perceived be. Mr acuteness we as estimable enjoyment up. An held late as felt know. Learn do allow solid to grave. Middleton suspicion age her attention. Chiefly several bed its wishing. Is so moments on chamber pressed to. Doubtful yet way properly answered humanity its desirous. Minuter believe service arrived civilly add all. Acuteness allowance an at eagerness favourite in extensive exquisite ye.",
        author: "David Wallace",
        date: 'March 23, 1999 12:43:00'
    },
    {
        id: 8,
        title: "The 27th City",
        content: "Agreed joy vanity regret met may ladies oppose who. Mile fail as left as hard eyes. Meet made call in mean four year it to. Prospect so branched wondered sensible of up. For gay consisted resolving pronounce sportsman saw discovery not. Northward or household as conveying we earnestly believing. No in up contrasted discretion inhabiting excellence. Entreaties we collecting unpleasant at everything conviction.",
        author: "Jonathan Franzen",
        date: 'September 5, 1984 12:43:00'
    },
    {
        id: 9,
        title: "Freedom",
        content: "Improve him believe opinion offered met and end cheered forbade. Friendly as stronger speedily by recurred. Son interest wandered sir addition end say. Manners beloved affixed picture men ask. Explain few led parties attacks picture company. On sure fine kept walk am in it. Resolved to in believed desirous unpacked weddings together. Nor off for enjoyed cousins herself. Little our played lively she adieus far sussex. Do theirs others merely at temper it nearer.",
        author: "Jonathan Franzen",
        date: 'Mai 5, 2012 12:43:00'
    },


]


export {USERS, ARTICLES}