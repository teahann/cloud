{ config, lib, pkgs, ... }:

{
  imports = [ ./hardware-configuration.nix ];
  
  boot.loader = { systemd-boot.enable = true; efi.canTouchEfiVariables = true; };
  console.font = "Lat2-Terminus16";
  fonts.packages = with pkgs; [ font-awesome noto-fonts-emoji ];
  i18n.defaultLocale = "en_US.UTF-8";
  powerManagement.powertop.enable = true;
  nixpkgs.config.allowUnfree = true;
  system.stateVersion = "23.11";
  time.timeZone = "America/Denver";
  sound.enable = true;
  security.rtkit.enable = true;

  networking.wireless = {
    enable = true;
    networks = {
      "SSID" = { psk = "password123"; };
    };
  };

  xdg.portal = {
    enable = true;
    wlr.enable = true;
    extraPortals = [ pkgs.xdg-desktop-portal-gtk ];
  };

  # System packages
  environment.systemPackages = with pkgs; [
    actkbd dunst foot libnotify rofi-wayland waybar wget wlogout vim
  ];

  hardware = {
    bluetooth.enable = true;
    opengl = { enable = true; extraPackages = [ pkgs.intel-compute-runtime ]; };
  };

  users = {
    defaultUserShell = pkgs.zsh;
    users = {
      mainusr = {
        isNormalUser = true; home = "/home/mainusr";
        extraGroups = [ "wheel" "video" ];
        # User packages
        packages = with pkgs; [
          chromium discord git gimp htop firefox-wayland neofetch
          nodejs obs-studio python3 shotman steam sublime3 wl-clipboard
        ];
      };
      guest = {
        isNormalUser = true; home = "/home/guest";
        extraGroups = [ "wheel" "video" ];
        packages = with pkgs; [
          btop chromium gimp firefox-wayland hyprpaper neofetch nnn python3 slurp
        ];
      };
    };
  };

  programs = {
    light.enable = true;
    hyprland = { enable = true; xwayland.enable = true; };
    zsh = {
      enable = true;
      enableCompletion = true;
      autosuggestions.enable = true;
      ohMyZsh = { enable = true; theme = "duellj"; };
    }; 
  };

  services = {
    # -- Display --
    xserver = {
      enable = true; videoDrivers = [ "intel" ];
      displayManager.gdm = { enable = true; wayland = true; };
    };
    # -- Sound --
    pipewire = {
      enable = true; alsa = { enable = true; support32Bit = true; };
      pulse.enable = true; jack.enable = true;
    };
    blueman.enable = true;
    # Keyboard   
    actkbd = {
      enable = true;
      bindings = [
        { keys=[225]; events=["key"]; command="/run/current-system/sw/bin/light -A 5"; }
        { keys=[224]; events=["key"]; command="/run/current-system/sw/bin/light -U 5"; }
      ];
    };
    gollum = { enable = true; emoji = true; };
    # Battery
    tlp = {
      enable = true;
      settings = {
        CPU_BOOST_ON_AC = 1;
        CPU_BOOST_ON_BAT = 0;
        CPU_SCALING_ON_AC = "performance";
        CPU_SCALING_GOVERNOR_ON_BAT = "powersave";
        CPU_HWP_DYN_BOOST_AC = 1;
      };
    };
    thermald.enable = true;
    upower.enable = true;
  };

}