import React from "react";

export default function SubmitButton({ standardButton, loadingButton, isLoading }) {
  return (
    <>
      {
        isLoading ?
          loadingButton :
          standardButton
      }
    </>
  )
}