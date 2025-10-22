# 📋 Instruções de Uso - Image Spinner Widget

## 🎯 Pasta Criada com Sucesso!

A pasta `ImageSpinnerWidget` foi criada com todos os arquivos necessários:

```
ImageSpinnerWidget/
├── README.md                    # Documentação completa
├── ImageSpinnerWidget.json      # Metadados do widget
├── ImageSpinnerWidget.js        # Código JavaScript principal
├── ImageSpinnerWidget_Builder.js # Interface de configuração
├── Alex.jpeg                    # Imagem do spinner
├── test_sap_widget.html         # Página de teste
├── setup.bat                    # Script de configuração Git
├── .gitignore                   # Arquivos ignorados pelo Git
└── INSTRUCOES.md               # Este arquivo
```

## 🚀 Como Usar

### **Opção 1: Script Automático (Recomendado)**
```bash
# 1. Navegue para a pasta
cd ImageSpinnerWidget

# 2. Execute o script de setup
setup.bat
```

### **Opção 2: Manual**
```bash
# 1. Navegue para a pasta
cd ImageSpinnerWidget

# 2. Inicialize o Git
git init

# 3. Adicione os arquivos
git add .

# 4. Faça o commit inicial
git commit -m "SAP Analytics Cloud Image Spinner Widget"
```

## 📤 Próximos Passos

### 1. **Criar Repositório no GitHub**
- Acesse: https://github.com/new
- Nome sugerido: `ImageSpinnerWidget`
- Deixe público para acesso via URLs

### 2. **Conectar com GitHub**
```bash
# Substitua SEU-USUARIO pelo seu usuário
git remote add origin https://github.com/SEU-USUARIO/ImageSpinnerWidget.git
git branch -M main
git push -u origin main
```

### 3. **Atualizar URLs no JSON**
Edite `ImageSpinnerWidget.json` e substitua:
```json
"url": "https://raw.githubusercontent.com/SEU-USUARIO/ImageSpinnerWidget/main/ImageSpinnerWidget.js"
"url": "https://raw.githubusercontent.com/SEU-USUARIO/ImageSpinnerWidget/main/ImageSpinnerWidget_Builder.js"
```

### 4. **Registrar no SAP Analytics Cloud**
1. Acesse o SAC
2. Vá para **Analytic Applications** → **Custom Widgets**
3. Clique no **+** e cole o conteúdo do `ImageSpinnerWidget.json`
4. O widget será registrado automaticamente

## 🧪 Teste Local

Antes de fazer commit, teste localmente:
```bash
# Abra o arquivo de teste no navegador
test_sap_widget.html
```

## ⚙️ Configurações do Widget

O widget possui as seguintes propriedades configuráveis:

- **imageUrl**: URL da imagem (padrão: `./Alex.jpeg`)
- **spinnerSize**: Tamanho em pixels (padrão: `80`)
- **rotationSpeed**: Velocidade em segundos (padrão: `2`)
- **showText**: Mostrar texto (padrão: `true`)
- **loadingText**: Texto de loading (padrão: `Carregando...`)
- **backgroundColor**: Cor de fundo (padrão: `rgba(255, 255, 255, 0.9)`)
- **loadingDuration**: Duração em ms (padrão: `3000`)

## 🎮 Eventos e Métodos

### **Eventos:**
- `loadingStart` - Quando o loading inicia
- `loadingComplete` - Quando o loading termina

### **Métodos:**
- `startLoading()` - Iniciar loading
- `stopLoading()` - Parar loading
- `setLoadingDuration(ms)` - Definir duração
- `restart()` - Reiniciar widget

## 🔧 Troubleshooting

### **Erro: "Couldn't load custom widget"**
- Verifique se as URLs estão corretas
- Confirme se o repositório é público
- Teste as URLs diretamente no navegador

### **Imagem não carrega**
- Verifique se `Alex.jpeg` está no repositório
- Confirme se a URL da imagem está correta
- Teste a URL da imagem no navegador

### **Widget não aparece no SAC**
- Verifique se o JSON está válido
- Confirme se as URLs apontam para arquivos corretos
- Verifique o console do navegador para erros

## 📞 Suporte

Se tiver problemas:
1. Verifique o console do navegador (F12)
2. Teste as URLs diretamente
3. Confirme se todos os arquivos estão no repositório
4. Verifique se o repositório é público

---

**Pasta pronta para uso no SAP Analytics Cloud!** 🚀
