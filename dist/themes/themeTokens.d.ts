import figmaTokens, { themeKeys } from './generatedTokens';
export type FigmaThemeMode = keyof typeof figmaTokens.Variables;
export type ThemeMode = (typeof themeKeys)[FigmaThemeMode];
export declare const themeModes: ("dark" | "light" | "teal" | "pulse-dark" | "pulse" | "teal-dark")[];
export declare const themeTokens: {
    core: {
        color: {
            primary: Record<string, string>;
            secondary: Record<string, string>;
            info: Record<string, string>;
            error: Record<string, string>;
            warning: Record<string, string>;
            success: Record<string, string>;
            gray: Record<string, string>;
            palette: Record<string, string>;
        };
        space: Record<string, number>;
        radius: Record<string, number>;
        fontFamily: "'Roboto', sans-serif" | "'Inter', sans-serif";
        fontSize: Record<string, number>;
        fontWeight: Record<string, number>;
        lineHeight: Record<string, number>;
    };
    semantic: {
        color: {
            background: {
                canvas: "#25293c" | "#f8f7fa" | "#23272f" | "#F6F7F9" | "#0b2023" | "#f4f9f9";
                surface: "#2f3349" | "#ffffff" | "#343a46" | "#152e32";
            };
            text: {
                primary: "#e1def5e5" | "#2f2b3de5" | "#f6f7f9" | "#23272fe5" | "#f0fdfa" | "#1e293be5";
                secondary: "#e1def5b2" | "#2f2b3db2" | "#ebecf0" | "#23272fb2" | "#ccfbf1" | "#1e293bb2";
                muted: "#e1def58c" | "#2f2b3d8c" | "#99a1b3" | "#23272f8c" | "#99c4be" | "#1e293b8c";
                disabled: "#e1def566" | "#2f2b3d66" | "#99a1b366" | "#23272f66" | "#1e293b66";
            };
            border: {
                subtle: "#e1def53d" | "#2f2b3d3d" | "#f6f7f93d" | "#23272f3d" | "#1e293b3d";
                strong: "#e1def538" | "#2f2b3d38" | "#f6f7f938" | "#23272f38" | "#1e293b38";
            };
        };
    };
    themes: Record<ThemeMode, {
        core: {
            color: {
                primary: Record<string, string>;
                secondary: Record<string, string>;
                info: Record<string, string>;
                error: Record<string, string>;
                warning: Record<string, string>;
                success: Record<string, string>;
                gray: Record<string, string>;
                palette: Record<string, string>;
            };
            space: Record<string, number>;
            radius: Record<string, number>;
            fontFamily: "'Roboto', sans-serif" | "'Inter', sans-serif";
            fontSize: Record<string, number>;
            fontWeight: Record<string, number>;
            lineHeight: Record<string, number>;
        };
        semantic: {
            color: {
                background: {
                    canvas: "#25293c" | "#f8f7fa" | "#23272f" | "#F6F7F9" | "#0b2023" | "#f4f9f9";
                    surface: "#2f3349" | "#ffffff" | "#343a46" | "#152e32";
                };
                text: {
                    primary: "#e1def5e5" | "#2f2b3de5" | "#f6f7f9" | "#23272fe5" | "#f0fdfa" | "#1e293be5";
                    secondary: "#e1def5b2" | "#2f2b3db2" | "#ebecf0" | "#23272fb2" | "#ccfbf1" | "#1e293bb2";
                    muted: "#e1def58c" | "#2f2b3d8c" | "#99a1b3" | "#23272f8c" | "#99c4be" | "#1e293b8c";
                    disabled: "#e1def566" | "#2f2b3d66" | "#99a1b366" | "#23272f66" | "#1e293b66";
                };
                border: {
                    subtle: "#e1def53d" | "#2f2b3d3d" | "#f6f7f93d" | "#23272f3d" | "#1e293b3d";
                    strong: "#e1def538" | "#2f2b3d38" | "#f6f7f938" | "#23272f38" | "#1e293b38";
                };
            };
        };
    }>;
};
export declare const getThemeTokens: (mode: ThemeMode) => {
    core: {
        color: {
            primary: Record<string, string>;
            secondary: Record<string, string>;
            info: Record<string, string>;
            error: Record<string, string>;
            warning: Record<string, string>;
            success: Record<string, string>;
            gray: Record<string, string>;
            palette: Record<string, string>;
        };
        space: Record<string, number>;
        radius: Record<string, number>;
        fontFamily: "'Roboto', sans-serif" | "'Inter', sans-serif";
        fontSize: Record<string, number>;
        fontWeight: Record<string, number>;
        lineHeight: Record<string, number>;
    };
    semantic: {
        color: {
            background: {
                canvas: "#25293c" | "#f8f7fa" | "#23272f" | "#F6F7F9" | "#0b2023" | "#f4f9f9";
                surface: "#2f3349" | "#ffffff" | "#343a46" | "#152e32";
            };
            text: {
                primary: "#e1def5e5" | "#2f2b3de5" | "#f6f7f9" | "#23272fe5" | "#f0fdfa" | "#1e293be5";
                secondary: "#e1def5b2" | "#2f2b3db2" | "#ebecf0" | "#23272fb2" | "#ccfbf1" | "#1e293bb2";
                muted: "#e1def58c" | "#2f2b3d8c" | "#99a1b3" | "#23272f8c" | "#99c4be" | "#1e293b8c";
                disabled: "#e1def566" | "#2f2b3d66" | "#99a1b366" | "#23272f66" | "#1e293b66";
            };
            border: {
                subtle: "#e1def53d" | "#2f2b3d3d" | "#f6f7f93d" | "#23272f3d" | "#1e293b3d";
                strong: "#e1def538" | "#2f2b3d38" | "#f6f7f938" | "#23272f38" | "#1e293b38";
            };
        };
    };
};
