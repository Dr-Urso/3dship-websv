package main

import (
	_ "github.com/gogf/gf/contrib/drivers/mysql/v2"

	_ "shipmgr/internal/packed"

	_ "shipmgr/internal/logic"

	"github.com/gogf/gf/v2/os/gctx"

	"shipmgr/internal/cmd"
)

func main() {
	cmd.Main.Run(gctx.GetInitCtx())
}
