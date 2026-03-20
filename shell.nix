{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_20
    typescript
    nodePackages.npm
    nodePackages.typescript    # Adds 'tsc' to your PATH
    tsx           # Adds 'ts-node' to your PATH
  ];

  shellHook = ''
    echo "Welcome to the Nix-powered development shell!"
    # Add your custom commands or environment variables here
    # Example: export MY_VARIABLE="hello"
  '';
}
