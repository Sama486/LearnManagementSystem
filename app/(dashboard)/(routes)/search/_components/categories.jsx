"use client"

import {
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcSportsMode,
    FcHeatMap,
    FcBusinessman
} from "react-icons/fc"

import { IconType } from "react-icons"
import { CategoryItem } from "./category-item"

const iconMap = {
    "Engineering": FcEngineering,
    "Filming": FcFilmReel,
    "Computer Science": FcHeatMap,
    "Music": FcMusic,
    "Photography": FcOldTimeCamera,
    "Web Development": FcMultipleDevices,
    "Fitness": FcSportsMode,
    "Business": FcBusinessman,
    "Finance": FcSalesPerformance,
}

export const Categories = ({ items }) => {

    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            )

            )}
        </div>
    )
}

