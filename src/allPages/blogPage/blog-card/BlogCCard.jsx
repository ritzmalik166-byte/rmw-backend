"use client";
import React from "react";
import style from "./page.module.css";

function BlogCCard() {
  return (
    <div className={style.card}>
      {/* === Image Section === */}
      <div className={style.imageWrapper}>
        <img
          className={style.cardImage}
          src="https://c4.wallpaperflare.com/wallpaper/632/34/549/technology-monitor-alpha-coders-binary-wallpaper-preview.jpg"
          alt="Technology Banner"
        />
      </div>
      {/* === Blog Info Section === */}
      <div className={style.cardContent}>
        <p className={style.tag}>TECHNOLOGY</p>
        <h1 className={style.title}>What's New In 2025 Tech</h1>
        <p className={style.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, iure?
          Magni velit excepturi necessitatibus repudiandae nisi vitae, quod
          sequi iusto ab quibusdam laborum, adipisci eos obcaecati sapiente!
          Ipsa, repellat quos?
        </p>
      </div>
      {/* === Footer Section === */}
      <div className={style.cardFooter}>
        <p className={style.date}>July 3, 2025</p>
        <button className={style.shareBtn}>Share Now</button>
      </div>
    </div>
  );
}

export default BlogCCard;
