{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_20
    typescript
    nodePackages.npm
    nodePackages.typescript    # Adds 'tsc' to your PATH
    tsx           # Adds 'ts-node' to your PATH
    prisma-engines
    prisma
  ];

  shellHook = ''
    echo "Welcome to the Nix-powered development shell!"
    # Add your custom commands or environment variables here
    # Example: export MY_VARIABLE="hello"
    export PKG_CONFIG_PATH="${pkgs.openssl.dev}/lib/pkgconfig"
    export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
    export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
    export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
    export PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt"
  '';
}
