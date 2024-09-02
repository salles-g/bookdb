import { useReads } from "../../context/ReadsProvider";
import React, { useEffect } from "react";
import { Form, useNavigation, useSubmit } from "react-router-dom";

const SearchForm = () => {
  const { q } = useReads();
  const submit = useSubmit();
  const navigation = useNavigation();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    $("#search-form")!.value = q;
  }, [q]);

  return (
    <Form id="search-form" role="search">
      <input
        id="q"
        className={searching ? "loading" : ""}
        aria-label="Buscar leituras"
        placeholder="Buscar"
        type="search"
        name="q"
        defaultValue={q}
        onChange={(event) => {
          const isFirstSearch = q == null;
          submit(event.currentTarget.form!, {
            replace: !isFirstSearch,
          });
        }}
      />
      <div id="search-spinner" aria-hidden hidden={!searching} />
      <div className="sr-only" aria-live="polite"></div>
    </Form>
  );
};

export default SearchForm;
