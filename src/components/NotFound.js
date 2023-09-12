import React from 'react'
import { Link } from "react-router-dom";

export default function NotFound() {
  document.title = "Ease Meet (404)!"
  return (
    <div className='text-center container'>
        <h2>Oops...Not Found!</h2>
        <p>Sorry to say! But we are unable found what you want.</p>
        <Link style={{ textDecoration: "none", color: "blueviolet" }} to={"/"}>Back to Home!</Link>
    </div>
  )
}
