#!/bin/bash
cd node_modules
if [ -d "react" ]; then
  echo "👻 hiding peer dependencies..."
  mv react react_old
  mv react-dom react-dom_old
  mv styled-components styled-components_old
  echo 
  echo "You must now use external dependencies. You can now use this library locally linked!"
  echo
else
  echo "📦 restoring peer dependencies..."
  mv react_old react
  mv react-dom_old react-dom
  mv styled-components_old styled-components
  echo 
  echo "You are now using local dependencies! Remember to rerun this script before using this library linked."
  echo
fi
